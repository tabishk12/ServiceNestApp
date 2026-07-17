import TotalPayment from "./TotalPayment";
import PaymentMode from "./PaymentMode";
import BackButton from "@components/Utils/BackButton";

const PaymentPage = () => {
  return (
    <div className="">
      <div className="mb-4">
        <BackButton to="/address" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        <PaymentMode />
        <TotalPayment />
      </div>
    </div>
  );
};

export default PaymentPage;
