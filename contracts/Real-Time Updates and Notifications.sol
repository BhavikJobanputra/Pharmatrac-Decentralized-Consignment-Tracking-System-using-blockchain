contract RealTimeUpdates {
    struct Notification {
        uint256 notificationId;
        string message;
        address recipient;
        bool read;
        uint256 timestamp;
    }

    mapping(address => Notification[]) public notifications;

    event NotificationSent(uint256 indexed notificationId, string message, address indexed recipient, uint256 timestamp);

    function sendNotification(address _recipient, string memory _message) external {
        uint256 notificationId = notifications[_recipient].length + 1;
        notifications[_recipient].push(Notification(notificationId, _message, _recipient, false, block.timestamp));
        emit NotificationSent(notificationId, _message, _recipient, block.timestamp);
    }
}
