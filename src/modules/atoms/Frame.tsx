import classnames from 'classnames'
import propTypes from 'prop-types'
import { Children } from '@/types/children'
import './Frame.scss'

const Frame = ({
    className,
    children,
}: Children & {
    className?: string
}) => {
    return <div className={classnames('frame', className)}>{children}</div>
}

Frame.propTypes = {
    className: propTypes.string,
}

export default Frame
