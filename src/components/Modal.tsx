
type ModalProps = {
  title: string; 
  onClose: () => void;
  children : React.ReactNode;
}

export default function Modal( {title, onClose, children}: ModalProps) {
  return (
    <div>

<div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-xl w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
{children}


<div className="flex justify-end mt-4">
          <button
            className="bg-gray-400 px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>

     
    </div>
  </div>



    </div>
  )
}
