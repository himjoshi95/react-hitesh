import { useEffect, useState } from "react";

const Gallery = () => {

    const [id, setId] = useState("");
    const [images, setImages] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!id) return;

        fetch(`http://localhost:3008/api/files/${id}`)
            .then(res => {
                if (!res.ok) throw new Error('Images not found for this ID');
                return res.json()
            })
            .then(data => {
                setImages(data);
                setError('');
            })
            .catch(err => {
                setImages([]);
                setError(err.message);
            });
    }, [id]);

    return (
        <div>
            <div className="flex gap-2">
                <label>Assessment</label>
                <select
                    onChange={(e) => setId(e.target.value)}
                    value={id}
                    className="border border-black rounded w-[320px]"
                >
                    <option value="">Select Here</option>
                    <option value="6672d7678567463dd0befb0c">KDARFS Assessment June 2024</option>
                    <option value="683febe18a1ebd26d5862c92">KDARFS Assessment June 2025</option>
                </select>
            </div>

            <div className="mt-10">
                <div className="p-4">
                    <h2 className="text-xl font-bold mb-4">Gallery</h2>
                    {error && <p className="text-red-500">{error}</p>}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {images.map((url, i) => (
                            <img key={i} src={url} alt={`Image ${i}`} className="rounded shadow" />
                        ))}
                    </div>
                </div>

            </div>

        </div>
    )
}
export default Gallery;