// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CrowdfundingContract {
    struct Project {
        uint256 id;
        string title;
        string description;
        uint256 fundingGoal;
        uint256 currentFunding;
        uint256 deadline;
        address payable creator;
        bool completed;
        bool exists;
    }

    struct Backer {
        uint256 amount;
        bool hasBacked;
    }

    uint256 private projectCount;
    mapping(uint256 => Project) public projects;
    mapping(address => mapping(uint256 => Backer)) public backers;
    mapping(address => uint256[]) public userProjects;

    event ProjectCreated(
        uint256 indexed projectId,
        string title,
        uint256 fundingGoal,
        uint256 deadline,
        address creator
    );

    event ProjectFunded(
        uint256 indexed projectId,
        address indexed backer,
        uint256 amount
    );

    event ProjectCompleted(uint256 indexed projectId);

    function createProject(
        string memory _title,
        string memory _description,
        uint256 _fundingGoal,
        uint256 _deadline
    ) public {
        require(_fundingGoal > 0, "Funding goal must be greater than 0");
        require(_deadline > block.timestamp, "Deadline must be in the future");

        projectCount++;
        projects[projectCount] = Project({
            id: projectCount,
            title: _title,
            description: _description,
            fundingGoal: _fundingGoal,
            currentFunding: 0,
            deadline: _deadline,
            creator: payable(msg.sender),
            completed: false,
            exists: true
        });

        userProjects[msg.sender].push(projectCount);
        emit ProjectCreated(projectCount, _title, _fundingGoal, _deadline, msg.sender);
    }

    function fundProject(uint256 _projectId) public payable {
        require(msg.value > 0, "Funding amount must be greater than 0");
        require(projects[_projectId].exists, "Project does not exist");
        require(!projects[_projectId].completed, "Project is already completed");
        require(block.timestamp <= projects[_projectId].deadline, "Project deadline has passed");
        require(!backers[msg.sender][_projectId].hasBacked, "Already backed this project");

        projects[_projectId].currentFunding += msg.value;
        backers[msg.sender][_projectId] = Backer({
            amount: msg.value,
            hasBacked: true
        });

        emit ProjectFunded(_projectId, msg.sender, msg.value);

        if (projects[_projectId].currentFunding >= projects[_projectId].fundingGoal) {
            projects[_projectId].completed = true;
            projects[_projectId].creator.transfer(projects[_projectId].currentFunding);
            emit ProjectCompleted(_projectId);
        }
    }

    function getProject(uint256 _projectId) public view returns (Project memory) {
        require(projects[_projectId].exists, "Project does not exist");
        return projects[_projectId];
    }

    function getProjects() public view returns (Project[] memory) {
        Project[] memory allProjects = new Project[](projectCount);
        for (uint256 i = 1; i <= projectCount; i++) {
            allProjects[i - 1] = projects[i];
        }
        return allProjects;
    }

    function getUserProjects(address _user) public view returns (uint256[] memory) {
        return userProjects[_user];
    }

    function getBackerInfo(address _backer, uint256 _projectId) public view returns (Backer memory) {
        return backers[_backer][_projectId];
    }
} 