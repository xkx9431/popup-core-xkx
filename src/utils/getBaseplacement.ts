import {  BasePlacement,  Placement,  auto } from '../enums'

export default function getBasePlacement(
  placement: Placement | typeof auto
): BasePlacement | typeof auto {
  return placement.split('-')[0] as any; // issues here
}