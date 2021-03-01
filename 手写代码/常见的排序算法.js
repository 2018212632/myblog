/**
 * 题目：Array.prototype.sort 底层用的什么排序算法
 * 1. 当数组长度小于10的时候，使用插入排序
 * 2. 当数组长度大于10的时候，使用快速排序
 * 当数组的量不大时，插入排序的稳定性表现较好，且N为10左右，快排实际实际并不比插入快很多。
 * 稳定性：当数组中的成员经过多次排序后，得到的结果是一致的。比如：数组中有两个number 3 ，3 ；第一次和第二得到3，3是没有发生位置变化的。
 */
// 插入排序，假设数组第一个成员是有序的，后面的元素和有序的进行比较，如果不满足排序规则，那么从后往前排
function insertSort(arr) {
    var len =arr.length;
    for (var i=1;i<len; i++) {
        var temp=arr[i];
        var j=i-1;//默认已排序的元素
        while (j>=0 && arr[j]>temp) {  //在已排序好的队列中从后向前扫描
                arr[j+1]=arr[j]; //已排序的元素大于新元素，将该元素移到一下个位置
                j--;
            }
        arr[j+1]=temp;
        }
    return arr
}

// 快速排序，time:O(nlogn)
function quicksort(arr, start, end) {
    if(start > end) return
    let p = partition(arr, start, end)
    quicksort(arr, start, p-1)
    quicksort(arr, p+1, end)
}

function partition(arr, begin, end) {
    let pivot = end, counter = begin
    for(let i=begin; i<end; i++) {
        if(arr[i] > arr[pivot]) {
            let temp = arr[i]
            arr[i] = arr[counter]
            arr[counter] = temp
            counter++
        }
    }
    let temp = arr[counter]
    arr[counter] = arr[pivot]
    arr[pivot] = temp
    
    return counter
}