import Map from "@/components/map-components/map";
import useAuthValidation from "@/hooks/useAuthValidatation";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const MapPage = () => {

  const userId = useAuthValidation();


  return (
    <div>
      <Map userId={userId} />
    </div>
  )
};

export default MapPage;