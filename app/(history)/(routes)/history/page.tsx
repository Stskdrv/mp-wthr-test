import HistoryComponent from "@/components/history";
import useAuthValidation from "@/hooks/useAuthValidatation";
import { fetchUserHistory } from "@/lib/actions/history.actions";


const HistoryPage = async () => {

  const userId = useAuthValidation();

  const historyData = await fetchUserHistory(userId);

  return (
    <div>
      <HistoryComponent historyData={JSON.parse(historyData)} />
    </div>
  )
};

export default HistoryPage;