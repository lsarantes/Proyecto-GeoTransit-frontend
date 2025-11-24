import { LucideProps } from "lucide-react";
import { TypeLevelKeys } from "./type-level";

//INTERFACE GENERAL
export interface FieldConfig<T> {
  key: keyof T;
  label: string;
  placeholder: string ;
  type: "text" | "number" | "tel" | "email"; // opcional
  validate: (value: any) => string | null; // función de validación opcional
  layout: "grid" | "full";
  pattern: string;
  inputMode: "text" | "tel" | "url" | "email" | "numeric" | "decimal" | "search";
  min?: number ;
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
    items: T[];
    searchKeys: (keyof T)[];
    columns: TableColumn<T>[];
    // handlers that the parent (entity page) provides
    onCreate: (data: Omit<T, "id">) => void;
    onUpdate: (data: T) => void;
    onDelete: (id: string) => void;
    modalFields: FieldConfig<T> []
    // optional defaults
    defaultItemsPerPage?: number;
};



//TABLE
export interface GenericTableProps<T extends { id: string}> {
    originalItems: T[];
    filteredItems: T[];
    identity: string
    Icon?: React.ComponentType<LucideProps>;
    columns: TableColumn<T>[];
    searchTerm: string;
    currentPage: number;
    itemsPerPage: number;
    onEdit?: (item: T) => void;
    onDelete?: (id: string) => void;
    onView?: (item: T) => void;
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