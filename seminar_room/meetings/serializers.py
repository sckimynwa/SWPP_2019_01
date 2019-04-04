from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Meeting

class UserSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    meetings = serializers.PrimaryKeyRelatedField(many=True, queryset=Meeting.objects.all())
    class Meta:
        model = User
        fields = ('id', 'username', 'meetings')

class MeetingSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.pk')
    class Meta:
        model = Meeting
        fields = ('id', 'created', 'sinceWhen', 'tilWhen', 'user')

    # sinceWhen > tilWhen
    def validate(self, data):
        if data['sinceWhen'] >= data['tilWhen']:
            raise serializers.ValidationError("tilWhen must occur after sinceWhen")
        else:
            # the case of POST
            if self.instance == None:
                count = 0
                for w in Meeting.objects.all():
                    if data['tilWhen'] <= w.sinceWhen or data['sinceWhen'] >= w.tilWhen :
                        count += 1
                print(count, Meeting.objects.all().count())
                if count != Meeting.objects.all().count():
                    raise serializers.ValidationError("The time has already Reservated [POST]")
            # the case of PUT
            else :
                # if self.instance.id == w.id
                count = 0
                for w in Meeting.objects.all():
                    if self.instance.id == w.id :
                        count += 1
                    else :
                        if data['tilWhen'] <= w.sinceWhen or data['sinceWhen'] >= w.tilWhen :
                            count += 1
                if count != Meeting.objects.all().count():
                    raise serializers.ValidationError("The time has already Reservated [PUT]")
        return data

