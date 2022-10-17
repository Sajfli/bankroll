import Loader from '../atoms/Loader'
import style from './LoaderScreen.module.scss'
import Frame from '../atoms/Frame'

const LoaderScreen = () => {
    return (
        <Frame className={style.loaderScreen}>
            <Loader />
            <h1>Proszę czekać</h1>
        </Frame>
    )
}

export default LoaderScreen
