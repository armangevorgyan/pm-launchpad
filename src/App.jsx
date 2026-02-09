import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import DashboardPage from './components/Dashboard/DashboardPage'
import WeeksPage from './components/Weeks/WeeksPage'
import WeekDetail from './components/Weeks/WeekDetail'
import LibraryPage from './components/Library/LibraryPage'
import PDFReader from './components/Library/PDFReader'
import FrameworksPage from './components/Frameworks/FrameworksPage'
import ToolsPage from './components/Tools/ToolsPage'
import MentorPage from './components/Mentor/MentorPage'
import PortfolioPage from './components/Portfolio/PortfolioPage'
import JobSearchPage from './components/JobSearch/JobSearchPage'
import NotesPage from './components/Notes/NotesPage'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/weeks" element={<WeeksPage />} />
        <Route path="/weeks/:weekId" element={<WeekDetail />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/library/read/:bookId" element={<PDFReader />} />
        <Route path="/frameworks" element={<FrameworksPage />} />
        <Route path="/tools" element={<ToolsPage />} />
        <Route path="/mentor" element={<MentorPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/jobs" element={<JobSearchPage />} />
        <Route path="/notes" element={<NotesPage />} />
      </Routes>
    </Layout>
  )
}

export default App