import { all, show } from "@/api/rest/doctors";

class DoctorsService {
  all(payload) {
    return all(payload);
  }
  show(id) {
    return show(id);
  }
}
export default new DoctorsService();
