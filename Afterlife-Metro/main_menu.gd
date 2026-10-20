extends Control

func _ready() -> void:
	pass

func _process(delta: float) -> void:
	pass

func _on_start_pressed():
	get_tree().change_scene_to_file("res://Assets/Scenes/Game.tscn")


func _on_settings_pressed():
	print("settings pressed")

func _on_exit_pressed():
	get_tree().quit()
