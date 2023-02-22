nums = [1,3,6,10,12,15]

var averageValue = function(nums) {
  let soma = 0
  let contador = 0 
  
  for (let i = 0; i < nums.length; i++) {
      if (nums[i]%3 == 0 && nums[i]%2 == 0) {
          soma += [i]
          contador ++
      }
  }

  console.log(soma,contador)
}