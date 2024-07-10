// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ConsignmentTracking {
    enum ConsignmentStatus { Pending, InTransit, Delivered, Delayed, Lost }

    struct Consignment {
        uint256 consignmentId;
        address sender;
        address receiver;
        uint256 timestamp;
        ConsignmentStatus status;
        string currentLocation;
        bool verified;
    }

    mapping(uint256 => Consignment) public consignments;
    uint256 public consignmentCount;

    event ConsignmentAdded(uint256 indexed consignmentId, address indexed sender, address indexed receiver, uint256 timestamp);
    event ConsignmentStatusUpdated(uint256 indexed consignmentId, ConsignmentStatus status, string location, bool verified);

    function addConsignment(address _receiver, string memory _location) external {
        consignmentCount++;
        consignments[consignmentCount] = Consignment(consignmentCount, msg.sender, _receiver, block.timestamp, ConsignmentStatus.Pending, _location, false);
        emit ConsignmentAdded(consignmentCount, msg.sender, _receiver, block.timestamp);
    }

    function updateConsignmentStatus(uint256 _consignmentId, ConsignmentStatus _status, string memory _location, bool _verified) external {
        require(_consignmentId <= consignmentCount, "Consignment does not exist");
        Consignment storage consignment = consignments[_consignmentId];
        consignment.status = _status;
        consignment.currentLocation = _location;
        consignment.verified = _verified;
        emit ConsignmentStatusUpdated(_consignmentId, _status, _location, _verified);
    }
}
