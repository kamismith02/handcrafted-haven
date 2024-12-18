
import { deleteProduct, deleteProductFromAllFavorites, removeFromFavorites } from "../lib/data";
import { Product } from "./products/tempProductInfo";

export function DeletePopup({
    product,
    onClose,
    onConfirm,
  }: {
    product: Product;
    onClose: () => void;
    onConfirm: () => void;
  }) {

    async function handleDelete(){
        try {const id = product.id
        const deleteItem = await deleteProduct(id);
        const deleteFav = await deleteProductFromAllFavorites(id);
        onConfirm();}
        
        catch {
            alert('Failed to Delete Product. Please Try Again.')
        }   
    }
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete <strong>{product.product_name}</strong>?</p>
            <div className="mt-4 flex justify-end gap-4">
            <button className="text-gray-600 hover:text-gray-800" onClick={onClose}>
                Cancel
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={handleDelete}>
                Delete
            </button>
            </div>
        </div>
        </div>
    );
    }
 
  