/** @format */

import { type TypedUseSelectorHook, useSelector } from "react-redux";
import { type RootState } from "./reducers/stateTypes";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
