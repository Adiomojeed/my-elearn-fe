export type units = "m" | "cm" | "mm" | "ft" | "in";
export type volumeUnits = "m3" | "l" | "ml" | "g" | "ft3"

const convertToMetres = (value: number, unit: units): number => {
  switch (unit) {
    case "cm":
      return value / 100
    case "mm":
      return value / 1000
    case "ft":
      return value / 39.370
    case "in":
      return value / 3.281
    default:
      return value
  }
}

const convertFromMetres = (value: number, unit: volumeUnits): number => {
  switch (unit) {
    case "l":
      return value * 1000
    case "ml":
      return value * 1000000
    case "g":
      return value * 264.172
    case "ft3":
      return value * 35.315
    default:
      return value
  }
}

export { convertFromMetres, convertToMetres }