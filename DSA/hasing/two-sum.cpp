#include<iostream>
using namespace std;

class addnum{
    public:
    vector <int> twosum(vector<int>& nums,int target){
        unordered_map<int,int> memory;
        
        for(int i=0;i<nums.size();i++){
            int need=target-nums[i];
            if(memory.find(need)!=memory.end()){
                return{memory[need],i};
            }
            memory[nums[i]]=i;
        }
        return{};
    }
};
