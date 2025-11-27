import { LucideProps } from "lucide-react";
import { TypeLevelKeys } from "./type-level";
import { EstadosDefinidos } from "./types-stule-estado";

//INTERFACE GENERAL
export interface FieldConfig<T> {
  key: keyof T;
  label: string;
  placeholder?: string;
  // Se agregaron tipos personalizados para soportar los modales que creamos
  type?: "text" | "number" | "tel" | "email" | "date" | "select" | "multiselect" | "location" | "photo"; 
  validate?: (value: any) => string | null; 
  layout?: "grid" | "full";
  pattern?: string;
  inputMode?: "text" | "tel" | "url" | "email" | "numeric" | "decimal" | "search";
  min?: number;
  // Propiedad adicional para campos tipo select/multiselect
  options?: { label: string; value: string; classname?:string }[];
}

export interface TableColumn<T> {
    key: keyof T;
    label: string;
    level: TypeLevelKeys;
    classNameTitle: string;
    classNameText: string;
    Icon: React.ComponentType<LucideProps> ;
}



//PAGE
export type CrudPageProps<T> = {
    title: string;
    subtitle?: string;
    Icon?: React.ComponentType<LucideProps> ;
    identity: string;
    verUbicacion: boolean,
    items: T[];
    searchKeys: (keyof T)[];
    columns: TableColumn<T>[];
    // handlers that the parent (entity page) provides
    onCreate: (data: T) => void;
    onUpdate: (data: T) => void;
    onDelete: (id: string) => void;
    modalFields: FieldConfig<T> []
    // optional defaults
    defaultItemsPerPage?: number;
};



//TABLE
export interface GenericTableProps<T> {
    originalItems: T[];
    filteredItems: T[];
    identity: string
    verUbicaciones: boolean
    Icon?: React.ComponentType<LucideProps>;
    columns: TableColumn<T>[];
    searchTerm: string;
    currentPage: number;
    itemsPerPage: number;
    onEdit?: (item: T) => void;
    onDelete?: (id: string) => void;
    onView?: (item: T) => void;
    onViewLocation?: (item: T) => void;
    handleItemsPerPageChange: (value: string) => void;
}

//ADD OR EDIT MODAL


export interface CrudModalProps<T> {
  onSubmit: (data: T) => void;
  onCancel: () => void;
  initialData?: T;
  isEditing?: boolean;
  fields: FieldConfig<T>[];
}


//DETAILS MODAL
export interface ItemDetailsModalProps<T> {
    item: T;
    columns: TableColumn<T>[];
}

//DELETE MODAL
export interface ItemDeleteDialogProps {
  itemName: string;
  identity: string;
  onConfirm: () => void;
  onCancel: () => void;
}



export interface EstadoOption {
    label: string;          // Nombre visible (ej: "Activo")
    value: EstadosDefinidos;  // Clave interna (ej: "positive")
    className?: string;     // Opcional (?) porque los primeros no lo tienen
}