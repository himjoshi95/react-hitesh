import { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ItemType = {
  PARENT: "parent",
  CHILD: "child",
};

const DraggableItem = ({ item, index, moveItem, type, parentId }) => {
  const [{ isDragging }, drag] = useDrag({
    type,
    item: { id: item._id, index, parentId },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: type,
    hover: (draggedItem) => {
      if (draggedItem.index !== index && draggedItem.parentId === parentId) {
        moveItem(draggedItem.index, index, parentId);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`p-2 border ${isDragging ? "opacity-50" : "opacity-100"}`}
    >
      {item.name}
    </div>
  );
};

const NestedList = ({ data, moveItem }) => {
  return (
    <div>
      {data.map((parent, index) => (
        <div key={parent._id} className="p-2 border m-2">
          <DraggableItem
            item={parent}
            index={index}
            moveItem={moveItem}
            type={ItemType.PARENT}
            parentId={null}
          />
          <div className="ml-6">
            {parent.children.map((child, childIndex) => (
              <DraggableItem
                key={child._id}
                item={child}
                index={childIndex}
                moveItem={moveItem}
                type={ItemType.CHILD}
                parentId={parent._id}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const DragDropTree = () => {
  const [nestedData, setNestedData] = useState([
    {
      _id: "1",
      name: "Category 1",
      children: [
        { _id: "1-1", name: "Subcategory 1" },
        { _id: "1-2", name: "Subcategory 2" },
      ],
    },
    {
      _id: "2",
      name: "Category 2",
      children: [
        { _id: "2-1", name: "Subcategory A" },
        { _id: "2-2", name: "Subcategory B" },
      ],
    },
  ]);

  const moveItem = (fromIndex, toIndex, parentId) => {
    setNestedData((prevData) => {
      const newData = [...prevData];

      if (parentId === null) {
        // Moving a parent category
        const [movedItem] = newData.splice(fromIndex, 1);
        newData.splice(toIndex, 0, movedItem);
      } else {
        // Moving a child within its parent
        const parent = newData.find((p) => p._id === parentId);
        if (parent) {
          const [movedItem] = parent.children.splice(fromIndex, 1);
          parent.children.splice(toIndex, 0, movedItem);
        }
      }

      return newData;
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <NestedList data={nestedData} moveItem={moveItem} />
    </DndProvider>
  );
};

export default DragDropTree;
