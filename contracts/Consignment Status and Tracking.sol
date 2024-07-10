contract ConsignmentStatusTracking {
    struct ConsignmentStatus {
        uint256 consignmentId;
        ConsignmentTracking.ConsignmentStatus status;
        string location;
        bool verified;
        uint256 timestamp;
    }

    mapping(uint256 => ConsignmentStatus[]) public consignmentStatusHistory;

    event ConsignmentStatusAdded(uint256 indexed consignmentId, ConsignmentTracking.ConsignmentStatus status, string location, bool verified, uint256 timestamp);

    function addConsignmentStatus(uint256 _consignmentId, ConsignmentTracking.ConsignmentStatus _status, string memory _location, bool _verified) external {
        consignmentStatusHistory[_consignmentId].push(ConsignmentStatus(_consignmentId, _status, _location, _verified, block.timestamp));
        emit ConsignmentStatusAdded(_consignmentId, _status, _location, _verified, block.timestamp);
    }
}
