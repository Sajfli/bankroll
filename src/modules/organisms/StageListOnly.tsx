import { Stage } from '@/types/utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import style from './StageListOnly.module.scss'

const stages: Stage[] = [1, 2, 3, 4, 5, 6, 7]

type StagesProps = {
    userStage: Stage
}

type StageWrapperProps = {
    locked: boolean
    stage: Stage
    children: (React.ReactElement | false)[]
}

const StageWrapper = ({ locked, stage, children }: StageWrapperProps) => {
    if (locked) return <div className={style.wrapper}>{children}</div>
    else
        return (
            <Link to={`/etap/${stage}`} className={style.wrapper}>
                {children}
            </Link>
        )
}

const Stages = ({ userStage }: StagesProps) => {
    return (
        <div>
            <ul className={style.stagesList}>
                {stages.map((n) => {
                    const locked = userStage < n

                    return (
                        <li
                            key={n}
                            className={classNames({ [style.locked]: locked })}
                        >
                            <StageWrapper locked={locked} stage={n}>
                                <div className={style.stageLabel}>Etap</div>
                                <div className={style.stageNumber}>{n}</div>
                                {locked && (
                                    <div className={style.lock}>
                                        <FontAwesomeIcon icon="lock" />
                                    </div>
                                )}
                            </StageWrapper>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Stages
