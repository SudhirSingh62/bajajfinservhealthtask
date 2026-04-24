// Name: Sudhir Singh
// Roll Number: YOURROLL
function validateHierarchyData(inputPayload) {
  const acceptableConnections = [];
  const rejectedConnections = [];
  
  if (!Array.isArray(inputPayload)) return { valid_entries: acceptableConnections, invalid_entries: rejectedConnections };

  inputPayload.forEach(connectionItem => {
    if (typeof connectionItem !== 'string') {
      rejectedConnections.push(String(connectionItem));
      return;
    }
    const cleanItem = connectionItem.trim();
    const connectionPattern = /^[A-Z]->[A-Z]$/;
    if (!connectionPattern.test(cleanItem)) {
      rejectedConnections.push(connectionItem);
    } else {
      const [parentElement, childElement] = cleanItem.split('->');
      if (parentElement === childElement) {
        rejectedConnections.push(connectionItem);
      } else {
        acceptableConnections.push(cleanItem);
      }
    }
  });

  return { valid_entries: acceptableConnections, invalid_entries: rejectedConnections };
}
module.exports = { validate: validateHierarchyData };
