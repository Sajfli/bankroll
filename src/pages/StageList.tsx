import useAuth from '@/hooks/useAuth'
import StageListOnly from '@/modules/organisms/StageListOnly'
import { Stage } from '@/types/utils'
import { useEffect, useState } from 'react'

const StageList = () => {
    const auth = useAuth()
    const [userStage, setUserStage] = useState<Stage>(1)

    useEffect(() => {
        if (auth.isAuthed && auth.stage) {
            if (
                Number.isInteger(auth.stage) &&
                auth.stage > 1 &&
                auth.stage < 8
            )
                setUserStage(auth.stage as Stage)
            else setUserStage(1)
        } else setUserStage(1)
    }, [auth])

    return (
        <div>
            <h1 className="textCenter">Lista etapów</h1>
            <StageListOnly userStage={userStage} />
        </div>
    )
}

export default StageList
