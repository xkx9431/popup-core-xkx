import { altAxis } from '../enums'

export default function getAltAxis( axis: altAxis): altAxis {
    return axis === altAxis.x ? altAxis.y : altAxis.x
}