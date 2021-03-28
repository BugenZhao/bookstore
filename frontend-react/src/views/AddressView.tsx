import { createContext, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { SelectContextType } from "../services";

const AddressContext = createContext<SelectContextType<number>>(null!);

type Address = {
  id: number;
  name: string;
  tag: string;
  phone: string;
  address: string;
};

function AddressItem({ address }: { address: Address }) {
  const bgClass = address.tag === "Default" ? "bg-secondary" : "bg-success";
  const { selected, setSelected } = useContext(AddressContext);

  return (
    <button
      onClick={() => setSelected(address.id)}
      className={`list-group-item list-group-item-action ${
        selected === address.id ? "active" : ""
      }`}
    >
      <div className="d-flex w-100 justify-content-between align-items-center">
        <h5 className="mb-1">{address.name}</h5>
        <span className={`badge ${bgClass} rounded-pill`}>{address.tag}</span>
      </div>
      <p className="mb-0 small">{address.phone}</p>
      <p className="mb-0">{address.address}</p>
    </button>
  );
}

export function AddressView() {
  const [selected, setSelected] = useState(0);

  return (
    <AddressContext.Provider value={{ selected, setSelected }}>
      <div>
        <h4 className="mb-3">Shipping Address</h4>
        <form className="needs-validation" noValidate={true}>
          <div className="list-group">
            <AddressItem
              address={{
                id: 0,
                name: "Bugen Zhao",
                tag: "Default",
                phone: "+86 155 2121 2121",
                address: "1234 Main St., Shanghai, China",
              }}
            />
            <AddressItem
              address={{
                id: 1,
                name: "Bugen Zhao",
                tag: "Home",
                phone: "+86 155 2121 2121",
                address: "4321 Home St., Shanghai, China",
              }}
            />
            <AddressItem
              address={{
                id: 2,
                name: "Fuken Chao",
                tag: "School",
                phone: "+86 188 1234 5678",
                address: "9876 School St., Shanghai, China",
              }}
            />

            <Link to="#" className="list-group-item list-group-item-action">
              <span className="text-muted">Add a new address...</span>
            </Link>
          </div>
        </form>
      </div>
    </AddressContext.Provider>
  );
}
