import '@/styles/globals.css'
import AlertModal from './components/alert_modal/alert_modal'
import Loading from './components/loadingModal/LoadingModal'

export default function App({ Component, pageProps }) {
  return (
    <>
      <AlertModal/>
      <Loading/>
      <Component {...pageProps} />
    </>
  )
}
