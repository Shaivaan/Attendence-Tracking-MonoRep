import { create } from "zustand";

const statsLabel = {
  checkIn:'Total Check In',
  checkOut:'Total Check Out',
  totalAttendee:'Total Attendees'
} as unknown as Record<keyof DashboardDataType,string>;

const useZustandStore = create<StoreType>()((set) => ({
  dashboardData: {
    checkIn:0,
    checkOut:0,
    totalAttendee:0,
    isLoading:false,
    isLoadedOnce:false
  },
  handleDashboardData : (data)=> set((state) => ({ dashboardData : {...state.dashboardData,...data}}))
}));

export {statsLabel};
export default useZustandStore;