import { combineReducers } from "redux";
import addUserReducer from './AddUserReducer/addUserReducer';
import storage from "redux-persist/lib/storage";
import {persistReducer} from "redux-persist";
import authReducer from "./AuthReducer/authReducer";
import categoryReducer from './CategoryReducer/categoryReducer';
import EditCategoryReducer from './CategoryReducer/EditCategoryReducer';
import userListReducer from './UserReducer/userListReducer';
import EditUserReducer from './UserReducer/EditUserReducer';
import productListReducer from './ProductReducer/productListReducer';
import editProductReducer from './ProductReducer/editProductReducer';
import productDetailsReducer from './ProductReducer/productDetailsReducer';
import CurrentUserInfoReducer from './UserReducer/UserInfoReducer';
import PersistedCartReducer from "./CartReducer/PersistedCartReducer";
import CartReducer from './CartReducer/CartReducer';
import OrdersReducer from './OrderReducer/OrdersReducer';
import UserOrderListReducer from './OrderReducer/UserOrderListReducer';
import LoaderReducer from './LoaderReducer/LoaderReducer';
import SearchReducer from './SeatchReducer/SearchReducer';
import ToggleReducer from './ToggleReducer/ToggleReducer';
import CategoryListForFilterReducer from './CategoryReducer/CategoryListForFilterReducer';



const persistConfig = {
    key: 'dutara',
    storage: storage,
};
const persistConfig2 = {
    key: 'dutaraCart',
    storage: storage,
};
const persistedStorage = persistReducer(persistConfig, authReducer);
const PersistedCartStorage =  persistReducer(persistConfig2, PersistedCartReducer);
const rootReducer = combineReducers({
    addUserReducer,
    categoryStore: categoryReducer,
    CategoryListForFilterReducer,
    EditCategoryReducer,
    userListReducer,
    EditUserReducer,
    productList:productListReducer,
    singleProductForEdit:editProductReducer,
    CurrentUserInfoReducer,
    productDetailsReducer,
    CartReducer,
    OrdersReducer,
    UserOrderListReducer,
    LoaderReducer,
    SearchText:SearchReducer,
    ToggleReducer,
    
    persistedStorage,
    PersistedCartStorage,
});

export default  rootReducer;