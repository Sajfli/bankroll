import Loader from '../atoms/Loader'
import style from './LoaderScreen.module.scss'

const LoaderScreen = () => {
    return (
        <div className={style.loaderScreen}>
            <Loader />
            <h1>Proszę czekać</h1>
        </div>
    )
}

export default LoaderScreen
