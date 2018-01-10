/**
 * @author Philip Van Raalte
 * @date 2018-01-10
 */

export function formatNum(num){
  return Number(num).toLocaleString(undefined, {maximumFractionDigits: 0});
}

export function formatDate(date) {
  return (new Date(date)).toLocaleDateString();
}