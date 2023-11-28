import create from 'zustand';
import type { BatteryDTO } from '../pages/home/entity';

interface BatteryDTOStore {
  batteryDTO: BatteryDTO;
  updateBatteryDTO: (newDTO: BatteryDTO) => void;
}

const initialBatteryDTO: BatteryDTO = {
  total: 0,
  page: 1,
  pageSize: 10,
  totalPages: 0,
  batteries: [],
};

const useBatteryDTOStore = create<BatteryDTOStore>((set) => ({
  batteryDTO: initialBatteryDTO,
  updateBatteryDTO: (newDTO) => set({ batteryDTO: newDTO }),
}));

export default useBatteryDTOStore;
