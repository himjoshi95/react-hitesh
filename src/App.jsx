import {Routes, Route} from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async';

import Navbar from './components/Navbar'
import PasswordGenerator from './pages/PasswordGenerator'
import CurrencyConvertor from './pages/CurrencyConvertor'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Data from './pages/Data'
import MultiDropdown from './pages/MultiDropdown'
import SingleDropdown from './pages/SingleDropdown'
import SignIn from './pages/SignIn'
import ExcelUpload from './pages/ExcelUpload'
import HookForm from './pages/HookForm'
import DragAndDrop from './pages/DragAndDrop';
import Editor from './pages/Editor';
import { Practice } from './components/Practice';
import  Matrix  from './pages/Matrix';
import MatrixTwo from './pages/MatrixTwo';
import MatrixThree from './pages/MatrixThree';
import MatrixFour from './pages/MatrixFour';
import Master from './pages/Master';
import Mapping from './pages/Mapping';
import MasterNew from './pages/MasterNew';
import MatrixFive from './pages/MatrixFive';
import MatrixSix from './pages/MatrixSix';
import Excel from './pages/Excel';
import ProtectedExcel from './pages/ProtectedExcel';
import ExportTable from './pages/ExportTable';
import PartOne from './pages/ReactHookForms/PartOne';
import PartTwo from './pages/ReactHookForms/PartTwo';
import StackedBarChart from './pages/Charts/StackedBarChart';
import Gallery from './pages/Gallery';
import ReportAnalysis from './pages/ReportAnalysis';



function App() {
  

  return (
    <div>
      <Navbar/>
      <div className='mx-2 md:mx-10 py-10'>
        <HelmetProvider>
        <Routes>
          <Route path='/' element={<PasswordGenerator/>} />
          <Route path='/home' element={<Home/>}/>
          <Route path='/convertor' element={<CurrencyConvertor/>}/>
          <Route path='/signUp' element={<SignUp/>}/>
          <Route path='/data' element={<Data/>}/>
          <Route path='/multi-select' element={<MultiDropdown/>}/>
          <Route path='/single-select' element={<SingleDropdown/>}/>
          <Route path='/signIn' element={<SignIn/>}/>
          <Route path='/excel-upload' element={<ExcelUpload/>}/>
          <Route path='/hook-form' element={<HookForm/>}/>
          <Route path='/drag-drop' element={<DragAndDrop/>}/>
          <Route path='/ck-editor' element={<Editor/>}/>
          <Route path='/practice' element={<Practice/>}/>
          <Route path='/matrix' element={<Matrix/>}/>
          <Route path='/matrix-two' element={<MatrixTwo/>} />
          <Route path='/matrix-three' element={<MatrixThree/>} />
          <Route path='/matrix-four' element={<MatrixFour/>} />
          <Route path='/master' element={<Master/>} />
          <Route path='/mapping' element={<Mapping/>}/>
          <Route path='/master-new' element={<MasterNew/>}/>
          <Route path='/matrix-five' element={<MatrixFive/>}/>
          <Route path='/matrix-six' element={<MatrixSix/>}/>
          <Route path='/excel' element={<Excel/>}/>
          <Route path='/protected-excel' element={<ProtectedExcel/>}/>
          <Route path='/export-table' element={<ExportTable/>}/>
          <Route path='/part-one' element={<PartOne/>}/>
          <Route path='/part-two' element={<PartTwo/>}/>
          <Route path='/stacked-bar-chart' element={<StackedBarChart/>}/>
          <Route path='/gallery' element={<Gallery/>}/>
          <Route path='/report-analysis' element={<ReportAnalysis/>}/>
        </Routes>
        </HelmetProvider>
      </div>
    </div>
  )
}

export default App
