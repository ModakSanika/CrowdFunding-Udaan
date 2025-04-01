import { BigNumber } from 'ethers';

export interface Project {
  id: BigNumber;
  title: string;
  description: string;
  fundingGoal: BigNumber;
  currentFunding: BigNumber;
  deadline: BigNumber;
  creator: string;
  completed: boolean;
  exists: boolean;
}

export interface Backer {
  amount: BigNumber;
  hasBacked: boolean;
} 