# Generated by Django 5.0.2 on 2024-02-24 15:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('wallet', '0004_alter_balance_balance_alter_balance_price'),
    ]

    operations = [
        migrations.AlterField(
            model_name='balance',
            name='balance',
            field=models.DecimalField(decimal_places=12, max_digits=20),
        ),
        migrations.AlterField(
            model_name='balance',
            name='price',
            field=models.FloatField(),
        ),
    ]