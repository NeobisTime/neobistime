from allauth.account.adapter import DefaultAccountAdapter


class CustomAccountAdapter(DefaultAccountAdapter):
    def save_user(self, request, user, form, commit=False):
        user = super().save_user(request, user, form, commit)
        data = form.cleaned_data
        user.department_id = data.get('department_id')
        user.phone = data.get('phone')
        user.name_surname = data.get('name_surname')
        user.save()
        return user
