import Swal from "sweetalert2";

interface IsweetAlert {
  type: 'success' | 'error';
  message: string;
}



export default function SweetAlert({ type, message }: IsweetAlert) {

  const SweetAlert = () => {
    Swal.fire({
      icon: type,
      text: message,
      timer: 1500
    }
    )
  };

  return null;

}