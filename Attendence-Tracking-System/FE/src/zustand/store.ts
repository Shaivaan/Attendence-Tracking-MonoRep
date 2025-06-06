import { create } from "zustand";

const statsLabel = {
  checkIn:'Total Check In',
  checkOut:'Total Check Out',
  totalAttendee:'Total Attendees'
} as unknown as Record<keyof DashboardDataType,string>;

const useZustandStore = create<StoreType>()((set) => ({
  dashboardData: {
    checkIn:null,
    checkOut:null,
    totalAttendee:null,
    isLoading:false,
    isLoadedOnce:false
  },
  handleDashboardData : (data)=> set((state) => ({ dashboardData : {...state.dashboardData,...data}})),

  formLoading:false,
  handleFormLoading: (isLoading:boolean)=> set(() => ({ formLoading : isLoading}))
}));

export {statsLabel};
export default useZustandStore;