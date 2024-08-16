import NavBar from './components/NavBar'
import RegistrationForm from './components/RegistrationForm'

export default function App() {
  return (
    <>
    <NavBar />
    <div className='min-h-screen bg-slate-100 flex items-center justify-center'>
      <RegistrationForm />
    </div>
    </>
  )
}
