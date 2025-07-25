// App.tsx
import { Routes, Route } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import PrivateRoute from './layout/PrivateRoutes';
import Home from './ui/pages/gen/Home';
import Login from './ui/pages/gen/Login';
import Inventory from './ui/pages/inventory/Inventory';
import ItemDetails from './ui/pages/items/ItemDetails';
import WarehouseDetails from './ui/pages/warehouses/WarehouseDetails';
import WarehousesPage from './ui/pages/warehouses/Warehouses';
import ItemCreate from './ui/pages/items/ItemCreate';
import WarehouseCreate from './ui/pages/warehouses/WarehouseCreate';
import InventoryCreate from './ui/pages/inventory/InventoryCreate';
import TransactionHistory from './ui/pages/transaction/TransactionHistory';
import EntryTransaction from './ui/pages/transaction/EntryTransaction';
import ExitTransaction from './ui/pages/transaction/ExitTransaction';
import ListDebtInventory from './ui/pages/inventory/ListDebtInventory';

const App = () => {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="Warehouses" element={<WarehousesPage />} />
          <Route path="Warehouses/:id" element={<WarehouseDetails />} />

          <Route path="Inventory" element={<Inventory />} />
          <Route path="Transaction/History/:warehouse_id" element={<TransactionHistory />} />
        </Route>
        
        <Route path="Item/:id" element={<ItemDetails />} />
        <Route path="Item/Create" element={<ItemCreate />} />

        <Route path="Warehouses/Create" element={<WarehouseCreate />} />

        <Route path="Inventory/Create/:warehouse_id" element={<InventoryCreate />} />

        <Route path="Transaction/Entry/:item_movement_group_id" element={<EntryTransaction />} />
        <Route path="Transaction/Exit/:sale_group_id" element={<ExitTransaction />} />


        <Route path="Inventory/Debt" element={<ListDebtInventory />} />
      </Route>

      
      <Route path='/Login' element={<Login />} />
    </Routes>
  );
}

export default App
