import requests

try:
    # ---- Alice Signup & Login ----
    alice_data = {'username': 'Alice', 'password': 'Password123@'}

    # Signup
    print("Creating user Alice...")
    requests.post('http://localhost:3000/users/signup', json=alice_data)

    # Login
    print("Logging in Alice...")
    response = requests.post('http://localhost:3000/auth/login', json=alice_data)
    alice_token = response.json()['access_token']

    # Use Alice's token to create a cat
    print("Creating multiple cats for Alice...")
    headers = {'Authorization': f'Bearer {alice_token}'}
    cat_data = {'name': 'Charlie', 'color': 'white'}
    requests.post('http://localhost:3000/cats', headers=headers, json=cat_data)
    cat_data = {'name': 'David', 'color': 'black&white'}
    requests.post('http://localhost:3000/cats', headers=headers, json=cat_data)


    # ---- Bob Signup & Login ----
    bob_data = {'username': 'Bob', 'password': 'Password123@'}

    # Signup
    print("Creating user Bob...")
    requests.post('http://localhost:3000/users/signup', json=bob_data)

    # Login
    print("Logging in Bob...")
    response = requests.post('http://localhost:3000/auth/login', json=bob_data)
    bob_token = response.json()['access_token']  # <-- retrieve Bob's token

    # Use Bob's token to create a cat
    print("Creating multiple cats for Bob...")
    headers = {'Authorization': f'Bearer {bob_token}'}
    cat_data = {'name': 'Erin', 'color': 'black'}
    requests.post('http://localhost:3000/cats', headers=headers, json=cat_data)
    cat_data = {'name': 'Frank', 'color': 'ginger'}
    requests.post('http://localhost:3000/cats', headers=headers, json=cat_data)


    # ---- Get all cats (using Alice's token as example) ----
    print("Showing all cats belonging to Alice...:")
    headers = {'Authorization': f'Bearer {alice_token}'}
    response = requests.get('http://localhost:3000/cats/', headers=headers)
    print(f"Alice's cats are : {response.json()}")


    # ---- Dummy User ----
    dummy_user_data = {'username': 'Dummy', 'password': 'Password123@'}

    # Signup
    print("Creating dummy user...")
    requests.post('http://localhost:3000/users/signup', json=dummy_user_data)

    # Login
    print("Logging in dummy user...")
    response = requests.post('http://localhost:3000/auth/login', json=dummy_user_data)
    dummy_token = response.json()['access_token']

    

    # Update dummy user
    print("Updating dummy user...")
    headers = {'Authorization': f'Bearer {dummy_token}'}
    user_update_data = {'username': 'DummyUpdated', 'password': 'Password456@'}
    requests.patch('http://localhost:3000/users/3', headers=headers, json=user_update_data)

    # Delete dummy user
    print("Deleting dummy user...")
    requests.delete('http://localhost:3000/users/3', headers=headers)


    # ---- Dummy Cat ----
    # Create dummy cat
    print("Creating dummy cat...")
    headers = {'Authorization': f'Bearer {alice_token}'}
    dummy_cat_data = {'name': 'Grace', 'color': 'cream'}
    response = requests.post('http://localhost:3000/cats', headers=headers, json=dummy_cat_data)
    dummy_cat_id = response.json()['id']  # assuming the response returns an ID

    # Update dummy cat
    print("Updating dummy cat...")
    cat_update_data = {'color': 'notAsCreamAsIThought'}
    requests.patch(f'http://localhost:3000/cats/{dummy_cat_id}', headers=headers, json=cat_update_data)

    # Delete dummy cat
    print("Deleting dummy cat...")
    requests.delete(f'http://localhost:3000/cats/{dummy_cat_id}', headers=headers)

except Exception as e:
    print(f"Error occurred: {e}")
