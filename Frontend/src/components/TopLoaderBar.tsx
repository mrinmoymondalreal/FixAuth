import { useNavigation } from "react-router-dom";
import TopBarProgress from "react-topbar-progress-indicator";

TopBarProgress.config({
  barColors: {
    "0": "hsl(241.11deg 100% 68.24%)",
    "1.0": "hsl(241.11deg 100% 68.24%)",
  },
  barThickness: 5,
  shadowBlur: 2,
});

function TopLoaderBar() {
  const navigation = useNavigation();
  return navigation.state == "loading" && <TopBarProgress />;
}
export default TopLoaderBar;
