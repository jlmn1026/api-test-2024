import logging
import random
import json
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

@csrf_exempt
def mock_api(request):
    if request.method == 'POST':
        rand = random.randint(1, 100)

        body_unicode = request.body.decode('utf-8')
        body_data = json.loads(body_unicode)
        print(body_data)
        print(rand)

        if rand > 30:
            return JsonResponse({ "success": True, "message": "success", "estimated_data": { "class": random.randint(1, 10), "confidence": random.random() } })
        else:
            return JsonResponse({ "success": False, "message": "Error:E50012", "estimated_data": {} })


    



    