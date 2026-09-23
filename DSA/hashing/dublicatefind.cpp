#include <iostream>
#include <vector>


using namespace std;

class FindDuplicate { 
public:
    bool hasDuplicate(vector<int>& nums) { 
        unordered_map<int,int> memory; 
        
        for (int i = 0; i < nums.size(); i++) {
            // 1. Check if the current number has been seen before
            if (memory.find(nums[i]) != memory.end()) {
                return true; // Duplicate found!
            }
            
            // nsert the number into memory so we remember it next time
            memory[nums[i]]=i;
        }
        
        return false; // Loop completed with no duplicates found
    }
};
