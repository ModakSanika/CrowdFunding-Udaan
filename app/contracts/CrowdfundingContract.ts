import { ethers } from 'ethers';
import { Project, Backer } from '../types';

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
const CONTRACT_ABI = [
  'function createProject(string title, string description, uint256 fundingGoal, uint256 deadline) public',
  'function getProjects() public view returns (tuple(uint256 id, string title, string description, uint256 fundingGoal, uint256 currentFunding, uint256 deadline, address creator, bool completed, bool exists)[])',
  'function getProject(uint256 projectId) public view returns (tuple(uint256 id, string title, string description, uint256 fundingGoal, uint256 currentFunding, uint256 deadline, address creator, bool completed, bool exists))',
  'function fundProject(uint256 projectId) public payable',
  'function getUserProjects(address user) public view returns (uint256[])',
  'function getBackerInfo(address backer, uint256 projectId) public view returns (tuple(uint256 amount, bool hasBacked))'
];

export class CrowdfundingContract {
  private contract: ethers.Contract;

  constructor(signer: ethers.Signer) {
    if (!CONTRACT_ADDRESS) {
      throw new Error('Contract address not found in environment variables');
    }
    console.log('Initializing CrowdfundingContract with:');
    console.log('Contract Address:', CONTRACT_ADDRESS);
    console.log('Signer:', signer);
    
    try {
      this.contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      console.log('Contract initialized successfully');
    } catch (error) {
      console.error('Failed to initialize contract:', error);
      throw error;
    }
  }

  async createProject(
    title: string,
    description: string,
    fundingGoal: ethers.BigNumber,
    deadline: number
  ): Promise<ethers.ContractTransaction> {
    try {
      console.log('Creating project with:', {
        title,
        description,
        fundingGoal: fundingGoal.toString(),
        deadline
      });
      
      const tx = await this.contract.createProject(
        title,
        description,
        fundingGoal,
        deadline
      );
      
      console.log('Project creation transaction:', tx.hash);
      return tx;
    } catch (error) {
      console.error('Failed to create project:', error);
      throw error;
    }
  }

  async getProjects(): Promise<Project[]> {
    try {
      console.log('Fetching all projects...');
      const projects = await this.contract.getProjects();
      console.log('Projects fetched successfully:', projects);
      return projects;
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      throw error;
    }
  }

  async getProject(projectId: number): Promise<Project> {
    try {
      console.log('Fetching project:', projectId);
      const project = await this.contract.getProject(projectId);
      console.log('Project fetched successfully:', project);
      return project;
    } catch (error) {
      console.error('Failed to fetch project:', error);
      throw error;
    }
  }

  async fundProject(projectId: number, amount: ethers.BigNumber): Promise<void> {
    try {
      console.log('Funding project:', projectId, 'with amount:', amount.toString());
      const tx = await this.contract.fundProject(projectId, { value: amount });
      console.log('Project funding transaction:', tx.hash);
      await tx.wait();
    } catch (error) {
      console.error('Failed to fund project:', error);
      throw error;
    }
  }

  async getUserProjects(userAddress: string): Promise<number[]> {
    try {
      console.log('Fetching user projects for:', userAddress);
      const projects = await this.contract.getUserProjects(userAddress);
      console.log('User projects fetched successfully:', projects);
      return projects;
    } catch (error) {
      console.error('Failed to fetch user projects:', error);
      throw error;
    }
  }

  async getBackerInfo(backerAddress: string, projectId: number): Promise<Backer> {
    try {
      console.log('Fetching backer info for:', backerAddress, 'project:', projectId);
      const backerInfo = await this.contract.getBackerInfo(backerAddress, projectId);
      console.log('Backer info fetched successfully:', backerInfo);
      return backerInfo;
    } catch (error) {
      console.error('Failed to fetch backer info:', error);
      throw error;
    }
  }
} 