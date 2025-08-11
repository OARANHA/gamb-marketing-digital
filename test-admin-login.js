const testAdminLogin = async () => {
  try {
    console.log('🧪 Testing admin login flow...');
    
    // Step 1: Test API directly
    console.log('\n1️⃣ Testing API endpoint...');
    const apiResponse = await fetch('http://localhost:3000/api/auth/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'admin@gamb.com.br',
        password: 'admin123'
      }),
    });
    
    const apiData = await apiResponse.json();
    console.log('API Response:', apiData);
    
    if (apiResponse.ok) {
      console.log('✅ API login successful');
      
      // Step 2: Test frontend component behavior
      console.log('\n2️⃣ Testing frontend behavior...');
      
      // Simulate the frontend state changes
      const adminData = apiData.admin;
      console.log('Admin data to be stored:', adminData);
      
      // Test localStorage operations
      localStorage.setItem('gamb_admin', JSON.stringify(adminData));
      const storedAdmin = localStorage.getItem('gamb_admin');
      const parsedAdmin = JSON.parse(storedAdmin);
      
      console.log('✅ localStorage operations successful');
      console.log('Stored admin data:', parsedAdmin);
      
      // Verify the data structure
      if (parsedAdmin && parsedAdmin.email === 'admin@gamb.com.br' && parsedAdmin.role === 'ADMIN') {
        console.log('✅ Admin data structure is correct');
        console.log('\n🎉 Admin login test completed successfully!');
        console.log('\n📋 Test Summary:');
        console.log('- API endpoint: ✅ Working');
        console.log('- Password verification: ✅ Working');
        console.log('- Response format: ✅ Correct');
        console.log('- localStorage operations: ✅ Working');
        console.log('- Data structure: ✅ Valid');
        
        return true;
      } else {
        console.log('❌ Admin data structure is invalid');
        return false;
      }
    } else {
      console.log('❌ API login failed:', apiData);
      return false;
    }
  } catch (error) {
    console.error('❌ Test failed with error:', error);
    return false;
  }
};

// Auto-run the test
testAdminLogin().then(success => {
  if (success) {
    console.log('\n✨ All tests passed! The admin login should work correctly.');
  } else {
    console.log('\n💥 Some tests failed. Check the error messages above.');
  }
});