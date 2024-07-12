contract ComplaintsHandling {
    enum ComplaintStatus { Pending, InProgress, Resolved, Rejected }

    struct Complaint {
        uint256 complaintId;
        address sender;
        uint256 consignmentId;
        string description;
        uint256 timestamp;
        ComplaintStatus status;
    }

    mapping(uint256 => Complaint) public complaints;
    uint256 public complaintCount;

    event ComplaintSubmitted(uint256 indexed complaintId, address indexed sender, uint256 indexed consignmentId, string description, uint256 timestamp);
    event ComplaintStatusUpdated(uint256 indexed complaintId, ComplaintStatus status);

    function submitComplaint(uint256 _consignmentId, string memory _description) external {
        require(_consignmentId <= consignmentCount, "Consignment does not exist");
        complaintCount++;
        complaints[complaintCount] = Complaint(complaintCount, msg.sender, _consignmentId, _description, block.timestamp, ComplaintStatus.Pending);
        emit ComplaintSubmitted(complaintCount, msg.sender, _consignmentId, _description, block.timestamp);
    }

    function updateComplaintStatus(uint256 _complaintId, ComplaintStatus _status) external {
        require(_complaintId <= complaintCount, "Complaint does not exist");
        complaints[_complaintId].status = _status;
        emit ComplaintStatusUpdated(_complaintId, _status);
    }
}
