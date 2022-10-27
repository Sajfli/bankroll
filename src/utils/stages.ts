import { Stage } from '@/types/utils'
const stages = [1, 2, 3, 4, 5, 6, 7] as const

const isStageCorrect = (stage: number | string) => {
    stage = +stage

    return stages.includes(stage as Stage)
}

export { isStageCorrect, stages }
