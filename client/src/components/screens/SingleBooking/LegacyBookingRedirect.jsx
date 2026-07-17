import { Navigate, useParams } from "react-router-dom";

/** Keeps old /notification/:bookingId links working. */
const LegacyBookingRedirect = () => {
  const { bookingId } = useParams();
  return <Navigate to={`/booking/${bookingId}`} replace />;
};

export default LegacyBookingRedirect;
