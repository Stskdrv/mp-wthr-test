import Map from "@/components/map-components/map";
import useAuthValidation from "@/hooks/useAuthValidatation";


const SearchPage = () => {

    const userId = useAuthValidation();

  return (
    <div>
      <Map search userId={userId} />
    </div>
  )
};

export default SearchPage;