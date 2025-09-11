const { generateDates } = require("./reusable-methods");
class API {
  constructor(page, request) {
    this.page = page;
    this.token = null;
    this.request = request;
    const { from, to, noOfDays } = generateDates();
    this.annualLeavePayload = {
      serviceRequestName: "Annual Leave",
      isPredefined: true,
      leaveType: "ANNUAL_LEAVE",
      requestStatus: "pending",
      requestDetails: {
        from,
        to,
        noOfDays,
        airportDropOff: true,
        passportRequest: true,
        message: "Hwbaab aw wbwbwbbww",
        addressDuringVacation: "Bwhw wbwbw w w bw w w",
        homeCountryMobileNo: "9494949496464",
      },
      serviceRequestId: "66a36c852f1e70b2a942eac7",
      approvedManagerName: null,
      approvedManagerNcId: null,
      approvedHRName: null,
      approvedHRNcId: null,
      finalApprovedDate: null,
      parentRequestId: null,
      createdReason: null,
      serviceRequestAttachments: [],
      skipLM: false,
      skipHR: false,
    };
  }
  async getToken() {
    const cookies = await this.page.context().cookies();
    const tokencookie = cookies.find((cookie) => cookie.name === "id_token");
    this.token = tokencookie ? tokencookie.value : null;
    return this.token;
  }
  async createAnnualLeave() {
    const response = await this.request.post(
      "https://cloud.apps.nael.thingspine.com/service/employeeServiceRequestsCreate",
      {
        data: this.annualLeavePayload,
        headers: {
          Authorization: `Bearer ${await this.getToken()}`,
          "Content-Type": "application/json",
        },
      }
    );
    const responseBody = await response.json(); // Parse JSON body
    return responseBody.requestUniqueId;
  }
}
module.exports = { API };
